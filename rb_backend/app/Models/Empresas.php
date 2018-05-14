<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Empresas extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    protected $table 			  = 'empresas';
    protected $primaryKey 	= 'idEmpresas';
    protected $fillable 		= [
    	'idEmpresas', 'name' , 'RIF' , 'direccion', 'descripcion', 'telefono', 'created_at'
    ];
    /**
     *
     * Relaciones de la tabla
     *
     */

    public function r_facturas()
      {
        return $this->hasMany('App\Models\Facturas', 'empresas_id', 'idEmpresas');
      }
    
}
