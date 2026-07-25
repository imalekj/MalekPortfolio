using Malek.Portfolio.Api.Data;
using Malek.Portfolio.Api.Dtos;
using Malek.Portfolio.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Malek.Portfolio.Api.Controllers
{
    [ApiController]
    [Route("api/profile")]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfileController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Profile>> Get()
        {
            var profile = await _context.Profiles.FirstOrDefaultAsync();
            if (profile is null) return NotFound();
            return Ok(profile);
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<Profile>> Update(ProfileDto dto)
        {
            var profile = await _context.Profiles.FirstOrDefaultAsync();
            if (profile is null)
            {
                profile = new Profile();
                _context.Profiles.Add(profile);
            }

            profile.Name = dto.Name;
            profile.Title = dto.Title;
            profile.Tagline = dto.Tagline;
            profile.Bio = dto.Bio;
            profile.Location = dto.Location;
            profile.ExperienceYears = dto.ExperienceYears;
            profile.Availability = dto.Availability;
            profile.CvUrl = dto.CvUrl;
            profile.GitHubUrl = dto.GitHubUrl;
            profile.LinkedInUrl = dto.LinkedInUrl;
            profile.Email = dto.Email;

            await _context.SaveChangesAsync();
            return Ok(profile);
        }
    }
}
