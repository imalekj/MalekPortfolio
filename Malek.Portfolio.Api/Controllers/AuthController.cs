using Malek.Portfolio.Api.Data;
using Malek.Portfolio.Api.Dtos;
using Malek.Portfolio.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Malek.Portfolio.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());

            if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return Unauthorized(new { title = "بيانات الدخول غير صحيحة." });
            }

            var token = _tokenService.CreateToken(user);

            return Ok(new LoginResponseDto
            {
                Token = token,
                FullName = user.FullName,
                Email = user.Email
            });
        }
    }
}
