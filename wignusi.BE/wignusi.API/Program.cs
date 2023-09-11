using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using wignusi.API.SeedData;
using wignusi.Domain.DataBase;
using wignusi.Infrastructure.UOF;
using wignusi.Infrastructure.UOF.Contract;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateLifetime = true,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        //ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        //ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"]))
    };
});

builder.Services.AddAuthorization();



builder.Services.AddDbContext<WignusiDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("WignusiConnection")));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standart Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    c.OperationFilter<SecurityRequirementsOperationFilter>();
    c.DescribeAllParametersInCamelCase();
    c.AddServer(new OpenApiServer
    {
        Description = "Development Server",
        Url = "https://localhost:7084"
    });
    c.CustomOperationIds(e => e.ActionDescriptor.RouteValues["action"] + e.ActionDescriptor.RouteValues["controller"]);

});

builder.Services.AddScoped<WignusiDbContext>();

var app = builder.Build();

var dbContext = app.Services.CreateScope().ServiceProvider.GetService<WignusiDbContext>();

dbContext?.Database.EnsureCreated();
var seeder = new SeedData(dbContext!);
seeder.SeedBooks();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(policy =>
{
    policy.WithOrigins("*");
    policy.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
});

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
