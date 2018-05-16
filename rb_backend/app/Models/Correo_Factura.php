<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Correo_Factura extends Model
{
    protected $table 			  = 'correo_factura';
    protected $primaryKey 	= 'id';
    protected $fillable 		= [
    	'correo_id', 'factura_id' ,'totalRenglonFactura', 'cantServicios','codigo', 'ODC' , 'descripcion', 'created_at'
    ];

    /**
     *
     * Relaciones de la tabla
     *
     */

    public function r_correoEnviado()
      {
        return $this->belongsTo('App\Models\CorreosEnviados', 'correo_id', 'idCorreos');
      }

    public function r_factura()
      {
        return $this->belongsTo('App\Models\Facturas', 'factura_id', 'idFacturas');
      }
    
}
