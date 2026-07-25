using Malek.Portfolio.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Malek.Portfolio.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
    }
}
