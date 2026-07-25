using FluentValidation;
using Malek.Portfolio.Api.Dtos;
using Malek.Portfolio.Api.Models;

namespace Malek.Portfolio.Api.Validators
{
    public class LoginRequestValidator : AbstractValidator<LoginRequestDto>
    {
        public LoginRequestValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty();
        }
    }

    public class ProfileDtoValidator : AbstractValidator<ProfileDto>
    {
        public ProfileDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(120);
            RuleFor(x => x.Title).NotEmpty().MaximumLength(160);
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
        }
    }

    public class SkillDtoValidator : AbstractValidator<SkillDto>
    {
        public SkillDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(80);
            RuleFor(x => x.Category)
                .NotEmpty()
                .Must(c => Enum.TryParse<SkillCategory>(c, true, out _))
                .WithMessage("Category must be one of: Backend, Frontend, Database, Tools");
        }
    }

    public class ProjectDtoValidator : AbstractValidator<ProjectDto>
    {
        public ProjectDtoValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(160);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(2000);
        }
    }

    public class ServiceDtoValidator : AbstractValidator<ServiceDto>
    {
        public ServiceDtoValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(120);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(1000);
        }
    }

    public class ContactMessageCreateDtoValidator : AbstractValidator<ContactMessageCreateDto>
    {
        public ContactMessageCreateDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(120);
            RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(160);
            RuleFor(x => x.Message).NotEmpty().MaximumLength(4000);
        }
    }
}
