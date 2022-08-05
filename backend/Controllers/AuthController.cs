using backend.Data;
using backend.Dtos;
using backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("controller")]
  public class AuthController : ControllerBase
  {

    private readonly IAuthRepository _authRepo;
    public AuthController(IAuthRepository authRepo)
    {
      _authRepo = authRepo;
    }

    [HttpPost("Register")]
    public ActionResult<int> Register(UserRegisterDto request)
    {
      var user = new User {Username = request.UserName};
      var response = _authRepo.Register(user, request.Password);
       return Ok(response);
    }

  }
}