using System.Collections.Generic;
using System.Linq;
using backend.Dtos;
using backend.Model;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using System.Globalization;
namespace backend.Data
{
  public class AuthRepository : IAuthRepository
  {
    private readonly DataContext _context;
    private readonly IConfiguration _config;
    public AuthRepository(DataContext context, IConfiguration config)
    {
      _context = context;
      _config = config;
    }
    public string Login(string userName, string password)
    {
        var user  = _context.Users.FirstOrDefault(x=>x.Username.ToLower().Equals(userName.ToLower()));
        if(user==null)
        {
          return "0";
        }
        if(VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
        {
          return CreateToken(user);
        }
        else
        {
          return "0";
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

    public int AddLoan(AddUpdateLoanDto loanDto)
    {
      var user  = _context.Users.FirstOrDefault(x=>x.Id==loanDto.UserId);

      if(loanDto.IsAdd)
      {
          Loan loan = new Loan{
          LoanId = loanDto.LoanId,
          FirstName = loanDto.FirstName,
          LastName = loanDto.LastName,
          PropertyAddress = loanDto.PropertyAddress,
          UserId = loanDto.UserId
          };
          loan.User = user;

        _context.Loans.Add(loan);
        _context.SaveChanges();
        
        return loan.LoanId;
        
      }
      else
      {
         Loan loan  = _context.Loans.FirstOrDefault(x=>x.LoanId == loanDto.LoanId);
         loan.FirstName = loanDto.FirstName;
         loan.LastName = loanDto.LastName;
         loan.PropertyAddress = loanDto.PropertyAddress;
         loan.User = user;

        _context.Loans.Update(loan);
        _context.SaveChanges();
        
        return loan.LoanId;
        
      }
      
    }

    public Loan GetLoanDetails(int loanId)
    {
        var loanDetails  = _context.Loans.FirstOrDefault(x=>x.LoanId == loanId);
        return loanDetails;
    }

    private string CreateToken(User user)
    {
      List<Claim> claims = new List<Claim>{
        new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
        new Claim(ClaimTypes.Name,user.Username)
      };

      SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.
        GetBytes(_config.GetSection("AppSettings:Token").Value));

      SigningCredentials creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

      SecurityTokenDescriptor toknDesc = new SecurityTokenDescriptor
      {
          Subject = new ClaimsIdentity(claims),
          Expires = System.DateTime.Now.AddDays(1),
          SigningCredentials =creds
      };

      JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
      SecurityToken token = tokenHandler.CreateToken(toknDesc);

      return tokenHandler.WriteToken(token);
    }

  }
}