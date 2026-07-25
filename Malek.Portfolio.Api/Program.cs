using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using FluentValidation;
using FluentValidation.AspNetCore;
using Malek.Portfolio.Api.Data;
using Malek.Portfolio.Api.Services;
using Malek.Portfolio.Api.Models;
using Scalar.AspNetCore;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

static string NormalizeConnectionString(string? raw)
{
    if (string.IsNullOrWhiteSpace(raw))
        throw new InvalidOperationException("ConnectionStrings:DefaultConnection is missing.");

    if (!raw.StartsWith("postgres://") && !raw.StartsWith("postgresql://"))
        return raw;

    // Render (and most hosts) expose the managed Postgres connection string as a
    // postgres:// URI, but Npgsql expects keyword=value pairs — convert it here.
    var uri = new Uri(raw);
    var userInfo = uri.UserInfo.Split(':', 2);
    var csBuilder = new NpgsqlConnectionStringBuilder
    {
        Host = uri.Host,
        Port = uri.Port > 0 ? uri.Port : 5432,
        Database = uri.AbsolutePath.TrimStart('/'),
        Username = Uri.UnescapeDataString(userInfo[0]),
        Password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : "",
        SslMode = SslMode.Require
    };
    return csBuilder.ConnectionString;
}

var connectionString = NormalizeConnectionString(builder.Configuration.GetConnectionString("DefaultConnection"));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers()
    .AddJsonOptions(x =>
    {
        x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        x.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("Jwt:Key is missing. Set it via `dotnet user-secrets set \"Jwt:Key\" \"<value>\"`.");
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,
            ValidateAudience = true,
            ValidAudience = jwtAudience
        };
    });

builder.Services.AddAuthorization();

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddScoped<TokenService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var feature = context.Features.Get<IExceptionHandlerFeature>();
        var isDevelopment = app.Environment.IsDevelopment();

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        await context.Response.WriteAsJsonAsync(new
        {
            title = "حدث خطأ غير متوقع في الخادم.",
            status = 500,
            detail = isDevelopment ? feature?.Error.Message : null
        });
    });
});

app.UseCors("FrontendPolicy");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.Migrate();

    var adminPassword = builder.Configuration["Seed:AdminPassword"] ?? "Malek@2026!";
    var adminUser = context.Users.FirstOrDefault(u => u.Email == "malekjaber39@gmail.com");
    if (adminUser is null)
    {
        context.Users.Add(new ApplicationUser
        {
            FullName = "Malek Jaber",
            Email = "malekjaber39@gmail.com",
            Password = BCrypt.Net.BCrypt.HashPassword(adminPassword),
            Role = UserRole.Admin
        });
    }
    else
    {
        // Keeps the live admin password in sync with Seed:AdminPassword on every
        // restart, since the initial blueprint deploy seeds it once and there is
        // no in-app "change password" screen yet.
        adminUser.Password = BCrypt.Net.BCrypt.HashPassword(adminPassword);
    }

    if (!context.Profiles.Any())
    {
        context.Profiles.Add(new Profile
        {
            Name = "Malek Jaber",
            Title = "Full Stack Web Developer",
            Tagline = "Hi, I'm Malek Jaber",
            Bio = "I build scalable web applications with modern technologies, transforming ideas into fast, elegant, and production-ready digital experiences.",
            Location = "Update your location",
            ExperienceYears = "Update your experience",
            Availability = "Available for freelance & full-time opportunities",
            CvUrl = "",
            GitHubUrl = "https://github.com/",
            LinkedInUrl = "https://linkedin.com/in/",
            Email = "malekjaber39@gmail.com"
        });
    }

    if (!context.Skills.Any())
    {
        var skills = new List<Skill>
        {
            new() { Category = SkillCategory.Backend, Name = "ASP.NET Core", Order = 1 },
            new() { Category = SkillCategory.Backend, Name = "C#", Order = 2 },
            new() { Category = SkillCategory.Backend, Name = "Entity Framework", Order = 3 },
            new() { Category = SkillCategory.Backend, Name = "SQL Server", Order = 4 },

            new() { Category = SkillCategory.Frontend, Name = "React", Order = 1 },
            new() { Category = SkillCategory.Frontend, Name = "JavaScript", Order = 2 },
            new() { Category = SkillCategory.Frontend, Name = "HTML", Order = 3 },
            new() { Category = SkillCategory.Frontend, Name = "CSS", Order = 4 },

            new() { Category = SkillCategory.Database, Name = "SQL Server", Order = 1 },
            new() { Category = SkillCategory.Database, Name = "PostgreSQL", Order = 2 },

            new() { Category = SkillCategory.Tools, Name = "Git", Order = 1 },
            new() { Category = SkillCategory.Tools, Name = "GitHub", Order = 2 },
            new() { Category = SkillCategory.Tools, Name = "Visual Studio", Order = 3 },
            new() { Category = SkillCategory.Tools, Name = "VS Code", Order = 4 },
        };
        context.Skills.AddRange(skills);
    }

    if (!context.Projects.Any())
    {
        var projects = new List<Project>
        {
            new()
            {
                Title = "Sample Project One",
                Description = "Placeholder project — replace with a real project via the admin panel.",
                ImageUrl = "",
                TechnologiesCsv = "React,ASP.NET Core,SQL Server",
                GitHubUrl = "",
                LiveUrl = "",
                Order = 1,
                Featured = true
            },
            new()
            {
                Title = "Sample Project Two",
                Description = "Placeholder project — replace with a real project via the admin panel.",
                ImageUrl = "",
                TechnologiesCsv = "React,JavaScript,PostgreSQL",
                GitHubUrl = "",
                LiveUrl = "",
                Order = 2,
                Featured = false
            },
            new()
            {
                Title = "Sample Project Three",
                Description = "Placeholder project — replace with a real project via the admin panel.",
                ImageUrl = "",
                TechnologiesCsv = "ASP.NET Core,Entity Framework,SQL Server",
                GitHubUrl = "",
                LiveUrl = "",
                Order = 3,
                Featured = false
            }
        };
        context.Projects.AddRange(projects);
    }

    if (!context.Services.Any())
    {
        var services = new List<Service>
        {
            new() { Title = "Web Development", Description = "Building scalable web applications.", IconKey = "globe", Order = 1 },
            new() { Title = "Backend Development", Description = "Robust APIs using ASP.NET Core.", IconKey = "server", Order = 2 },
            new() { Title = "UI Implementation", Description = "Modern responsive interfaces with React.", IconKey = "layout", Order = 3 },
        };
        context.Services.AddRange(services);
    }

    context.SaveChanges();
}

app.Run();
