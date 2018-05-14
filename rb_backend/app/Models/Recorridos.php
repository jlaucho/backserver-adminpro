<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recorridos extends Model
{
    protected $table 			  = 'recorridos';
    protected $primaryKey 	= 'idRecorridos';
    protected $fillable 		= [
    	'idRecorridos', 'origen' , 'destino' , 'cantidad', 'concepto', 'encomienda', 'nocturno', 'recorrido', 'totalRecorrido', 'correo_id', 'created_at'
    ];

    /**
     *
     * Relaciones de la tabla
     *
     */

    public function r_correo()
      {
        return $this->belongsTo('App\Models\CorreosEnviados', 'correo_id', 'idCorreos');
      }
    
}
