using System.Linq;
using backend.Model;

namespace backend.Data
{
  public class AuthRepository : IAuthRepository
  {
    private readonly DataContext _context;
    public AuthRepository(DataContext context)
    {
      _context = context;

    }
    public string Login(string userName, string password)
    {
        var response = string.Empty;
        var user  = _context.Users.FirstOrDefault(x=>x.Username.ToLower().Equals(userName.ToLower()));
        if(user==null)
        {
          return response;
        }
        else if(!VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
        {
          return response;
        }
        else
        {
          response = user.Id.ToString();
        }
        return response;
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