using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using TodoApi.Models;


/******************************* local connect ******************************/
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMvc().AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles );
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=EventTicket;Trusted_Connection=True;"));
var app = builder.Build();      
if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials());    //na server netreba

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


/****************************** Server connect ******************************/

/*
 var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMvc().AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddSpaStaticFiles(s =>
{
    s.RootPath = ".";
});
builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseSqlServer("Server=JakubTest\\SQLEXPRESS;Database=EventTicket;Trusted_Connection=True;"));
var app = builder.Build();
//"Server=JakubTest\\SQLEXPRESS;Database=EventTicket;Trusted_Connection=True;"
//"Server=localhost\\SQLEXPRESS;Database=EventTicket;Trusted_Connection=True;"

using (var scope = app.Services.CreateScope()) { var db = scope.ServiceProvider.GetRequiredService<TodoContext>(); db.Database.Migrate(); }

// Configure the HTTP request pipeline.
if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

}
app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials());

app.UseHttpsRedirection();

app.UseSpaStaticFiles();

app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = ".";
});

app.Run();
 
 
 
 
 
 
 
 
 */