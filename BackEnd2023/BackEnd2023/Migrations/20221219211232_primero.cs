using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackEnd2023.Migrations
{
    public partial class primero : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "bd_Persona",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ci_persona = table.Column<string>(type: "text", nullable: false),
                    a_paterno = table.Column<string>(type: "text", nullable: false),
                    a_materno = table.Column<string>(type: "text", nullable: false),
                    celular = table.Column<int>(type: "integer", nullable: false),
                    direccion = table.Column<string>(type: "text", nullable: false),
                    correo_electronico = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bd_Persona", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "bd_Role",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    descripcion = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bd_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "bd_Usuario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    usuarioNombre = table.Column<string>(type: "text", nullable: false),
                    password = table.Column<string>(type: "text", nullable: false),
                    idRol = table.Column<int>(type: "integer", nullable: false),
                    idPersona = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bd_Usuario", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "bd_Persona");

            migrationBuilder.DropTable(
                name: "bd_Role");

            migrationBuilder.DropTable(
                name: "bd_Usuario");
        }
    }
}
