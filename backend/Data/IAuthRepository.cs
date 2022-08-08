using System.Collections.Generic;
using backend.Model;

namespace backend.Data
{
    public interface IAuthRepository
    {
         int Register(User user, string password);

         int Login(string userName, string password);

         bool UserExists(string userName);

        public List<Loan> LoanList(int userId);
    }
}