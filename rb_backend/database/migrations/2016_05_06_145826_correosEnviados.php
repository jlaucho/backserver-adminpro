<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CorreosEnviados extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('correosEnviados', function (Blueprint $table) {
            $table->increments('idCorreos');
            $table->string('mensaje')->comment('Aca se guarda el mensaje de cabecera que se envia en los correos');
            $table->date('fechaServicio');
            $table->integer('cantHoras');
            $table->integer('cantPernocta');
            $table->integer('cantCorreos')->comment('cantidad de correos con el mismo monto')->default(1);
            
            $table->float('totalMonto')->nullable()->comment('Monto a cobrar por el servicio realizado');
            $table->float('bonoFinSemana');
            $table->enum('ODC',['SI','NO'])->default('SI');

            $table->integer('realizado_por')->unsigned()->comment('Guarda el conductor que realizo el servicio');
            $table->foreign('realizado_por')->references('id')->on('users')->onDelete('cascade');

            $table->integer('registrado_por')->unsigned()->comment('Guarda el usuario que registro el servicio en el sistema');
            $table->foreign('registrado_por')->references('id')->on('users')->onDelete('cascade');
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
        Schema::drop('correosEnviados');
    }
}
