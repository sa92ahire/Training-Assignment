using System.Collections.Generic;
using System.Linq;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
  public class AuthRepository : IAuthRepository
  {
    private readonly DataContext _context;
    public AuthRepository(DataContext context)
    {
      _context = context;

    }
    public int Login(string userName, string password)
    {
        var user  = _context.Users.FirstOrDefault(x=>x.Username.ToLower().Equals(userName.ToLower()));
        if(user==null)
        {
          return 0;
        }
        if(VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
        {
          return user.Id;
        }
        else
        {
          return 0;
        }
    }

    public int Register(User user, string password)
    {
        if(UserExists(user.Username))
        {
            return 0;
        }
        CreatePasswordHash(password,out byte[] passwordHash, out byte[] passwordSalt);
     
        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;

        _context.Users.Add(user);
        _context.SaveChanges();
        
        return user.Id;
    }

    public List<Loan> LoanList(int userId)
    {
      return _context.Loans.Where(x=> x.User.Id==userId).ToList();
    }


    public bool UserExists(string userName)
    {
      if(_context.Users.Any(x=>x.Username.ToLower() == userName.ToLower()))
      {
          return true;
      }
      return false;
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using(var hmac= new System.Security.Cryptography.HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using(var hmac= new System.Security.Cryptography.HMACSHA512(passwordSalt))
        {
          var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
          for(int i=0; i < computedHash.Length; i++)
          {
            if(computedHash[i] != passwordHash[i])
            {
              return false;
            }
          }
          return true;
        }
    }
  }
}