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
            $table->string('odc',12);
            $table->string('numFactura', 5);
            $table->date('fechaFactura');
            $table->string('codigo', 6);
            $table->string('descripcionFactura');
            $table->float('precioUnidad');
            $table->float('totalFact');
            $table->float('totalUnidad');
            $table->integer('cantUnidad');
            $table->float('IVA');
            $table->enum('pagada',['si', 'no'])->default('no');
            $table->integer('correo_id')->unsigned();
            $table->integer('empresa_id')->unsigned();
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
