using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd2023.Migrations
{
    public partial class inicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_bd_Usuario_bd_Persona_PersonaId",
                table: "bd_Usuario");

            migrationBuilder.DropIndex(
                name: "IX_bd_Usuario_PersonaId",
                table: "bd_Usuario");

            migrationBuilder.DropColumn(
                name: "PersonaId",
                table: "bd_Usuario");

            migrationBuilder.DropColumn(
                name: "idPersona",
                table: "bd_Usuario");

            migrationBuilder.AddColumn<long>(
                name: "idUsuario",
                table: "bd_Persona",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "idUsuario",
                table: "bd_Persona");

            migrationBuilder.AddColumn<int>(
                name: "PersonaId",
                table: "bd_Usuario",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "idPersona",
                table: "bd_Usuario",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_bd_Usuario_PersonaId",
                table: "bd_Usuario",
                column: "PersonaId");

            migrationBuilder.AddForeignKey(
                name: "FK_bd_Usuario_bd_Persona_PersonaId",
                table: "bd_Usuario",
                column: "PersonaId",
                principalTable: "bd_Persona",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
