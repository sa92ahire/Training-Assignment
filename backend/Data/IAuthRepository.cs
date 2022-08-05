using backend.Model;

namespace backend.Data
{
    public interface IAuthRepository
    {
         int Register(User user, string password);

         string Login(string userName, string password);

         bool UserExists(string userName);
    }
}