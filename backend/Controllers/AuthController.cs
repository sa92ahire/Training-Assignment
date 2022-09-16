using System.Collections.Generic;
using backend.Data;
using backend.Dtos;
using backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
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

    [HttpPost("Login")]
    public ActionResult<string> Login(UserRegisterDto request)
    {
      var response = _authRepo.Login(request.UserName, request.Password);
      return Ok(response);
    }

    [Authorize]
    [HttpGet("LoanList/{userId}")]
    public ActionResult<List<Loan>> LoanList(int userId)
    {
      var response = _authRepo.LoanList(userId);
      return Ok(response);
    }

    [HttpPost("AddLoan")]
    public ActionResult<int> AddLoan(AddUpdateLoanDto request)
    {
      var response = _authRepo.AddLoan(request);
       return Ok(response);
    }

    [HttpGet("LoanDetails/{loanId}")]
    public ActionResult<Loan> LoanDetails(int loanId)
    {
      var response = _authRepo.GetLoanDetails(loanId);
       return Ok(response);
    }
  }
}