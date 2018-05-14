<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Recorridos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recorridos', function (Blueprint $table) {
            $table->increments('idRecorridos');
            $table->string('origen',60)->comment('Este es el origen del recorrido');
            $table->string('destino', 60)->comment('Este es el destino del recorrido');
            $table->integer('cantidad')->default(1)->comment('Esta es la cantidad por la que se multiplica cada recorrido');
            $table->enum('concepto', ['DesvInter', 'DesvExter', 'Traslado'])->default('Traslado')->comment('Este es el concepto por el cual se origino el recorrido');
            $table->enum('encomienda', ['SI', 'NO'])->default('NO')->comment('Si el recorrido contempla encomienda');
            $table->enum('nocturno', ['SI', 'NO'])->default('NO')->comment('Si el recorrido contempla bono nocturno');
            $table->float('recorrido')->comment('Monto a cobrar por el servicio individual');
            $table->float('totalRecorrido')->comment('Monto total del recorrido');
            $table->integer('correo_id')->unsigned()->comment('Le hace referencia a cual correo se refiere este recorrido');
            $table->foreign('correo_id')->references('idCorreos')->on('correosEnviados')->onDelete('cascade');
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
        Schema::drop('recorridos');
    }
}
