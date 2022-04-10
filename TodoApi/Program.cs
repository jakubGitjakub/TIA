using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using TodoApi.Models;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMvc().AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles );
// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://tiket.westeurope.cloudapp.azure.com/")
                          .AllowAnyHeader().AllowAnyMethod();
                      });
});
builder.Services.AddControllers();
builder.Services.AddSpaStaticFiles();
builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseSqlServer("Server=tiket\\SQLEXPRESS;Database=tikety;Trusted_Connection=True;"));
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

app.UseHttpsRedirection();

//app.UseSpaStaticFiles();

app.UseStaticFiles();
app.UseRouting();
//app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials());
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();
/*
app.UseSpa(spa =>
{
    spa.Options.SourcePath = ".";
});*/

app.Run();