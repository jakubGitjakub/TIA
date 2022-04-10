using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using TodoApi.Models;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMvc().AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles );
// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddSpaStaticFiles();
builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=EventTicket;Trusted_Connection=True;"));
var app = builder.Build();      
//"Server=JakubTest\\SQLEXPRESS;Database=EventTicket;Trusted_Connection=True;"
//"Server=localhost\\SQLEXPRESS;Database=EventTicket;Trusted_Connection=True;"
//Server=JakubTest\\SQLEXPRESS;Database=EventTicket;User Id=jozkomrkvicka;Password=FnU*4R-\\_k@4WJZV;"

using (var scope = app.Services.CreateScope()) { var db = scope.ServiceProvider.GetRequiredService<TodoContext>(); db.Database.Migrate(); }

// Configure the HTTP request pipeline.
if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

}
app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials());

app.UseHttpsRedirection();

//app.UseSpaStaticFiles();

//app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();
/*
app.UseSpa(spa =>
{
    spa.Options.SourcePath = ".";
});*/

app.Run();