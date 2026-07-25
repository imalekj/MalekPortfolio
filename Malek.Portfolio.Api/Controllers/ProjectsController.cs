using Malek.Portfolio.Api.Data;
using Malek.Portfolio.Api.Dtos;
using Malek.Portfolio.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Malek.Portfolio.Api.Controllers
{
    [ApiController]
    [Route("api/projects")]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        private static object ToResponse(Project p) => new
        {
            p.Id,
            p.Title,
            p.Description,
            p.ImageUrl,
            Technologies = p.TechnologiesCsv.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries),
            p.GitHubUrl,
            p.LiveUrl,
            p.Order,
            p.Featured
        };

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projects = await _context.Projects.OrderBy(p => p.Order).ToListAsync();
            return Ok(projects.Select(ToResponse));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(ProjectDto dto)
        {
            var project = new Project
            {
                Title = dto.Title,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl,
                TechnologiesCsv = string.Join(',', dto.Technologies),
                GitHubUrl = dto.GitHubUrl,
                LiveUrl = dto.LiveUrl,
                Order = dto.Order,
                Featured = dto.Featured
            };
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = project.Id }, ToResponse(project));
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, ProjectDto dto)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project is null) return NotFound();

            project.Title = dto.Title;
            project.Description = dto.Description;
            project.ImageUrl = dto.ImageUrl;
            project.TechnologiesCsv = string.Join(',', dto.Technologies);
            project.GitHubUrl = dto.GitHubUrl;
            project.LiveUrl = dto.LiveUrl;
            project.Order = dto.Order;
            project.Featured = dto.Featured;

            await _context.SaveChangesAsync();
            return Ok(ToResponse(project));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project is null) return NotFound();

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
