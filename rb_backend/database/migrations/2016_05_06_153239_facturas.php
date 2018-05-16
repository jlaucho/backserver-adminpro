<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Facturas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('facturas', function (Blueprint $table) {
            $table->increments('idFacturas');
            $table->string('numFactura', 12)->comment('Numero de factura generada');
            $table->date('fechaFactura')->comment('Fecha de generacion de la factura');
            $table->string('descripcionFactura')->nullable();
            $table->float('baseImponible', 11, 2)->comment('Base imponible de la factura');
            $table->float('IVA_por', 4, 2)->comment('Porcentaje de Iva impuesto por el ejecutivo nacional');
            $table->float('IVA_monto', 10, 2)->comment('Monto de porcentaje de impuesto generado');
            $table->float('totalFact', 11, 2)->comment('Total facturado');
            $table->enum('pagada',['SI', 'NO'])->default('no');

            $table->integer('empresas_id')->unsigned();
            $table->foreign('empresas_id')->references('idEmpresas')->on('empresas');

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
        Schema::drop('facturas');
    }
}
