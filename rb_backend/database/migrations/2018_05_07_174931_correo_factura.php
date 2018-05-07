<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Contracts\Cache\Repository;

class CorreoFactura extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('correo_factura', function (Blueprint $table) {
            $table->increments('id');
            // Tabla de Correos
            $table->integer('correo_id')->unsigned()->comment('Le hace referencia a cual correo');
            $table->foreign('correo_id')->references('idCorreos')->on('correosEnviados')->onDelete('cascade');
            // Tabla de Facturas
            $table->integer('factura_id')->unsigned()->comment('Le hace referencia a la factura');
            $table->foreign('factura_id')->references('idFacturas')->on('facturas')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('correo_factura');
    }
}
