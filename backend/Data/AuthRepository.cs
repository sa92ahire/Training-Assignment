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
      throw new System.NotImplementedException();
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
  }
}