using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Runtime.CompilerServices;
using wignusi.API.SeedData;
using wignusi.Domain.DataBase;
using wignusi.Domain.Entities;
using wignusi.Infrastructure.UOF;
using wignusi.Infrastructure.UOF.Contract;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddDbContext<WignusiDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("WignusiConnection")));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
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

app.UseAuthorization();

app.MapControllers();

app.Run();
