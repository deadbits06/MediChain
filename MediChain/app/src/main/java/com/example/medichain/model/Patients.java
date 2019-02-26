package com.example.medichain.model;

public class Patients {

    private  String name ;
    private  String id ;

    public  Patients(){
    }

    public Patients(String name, String id) {
        this.name = name;
        this.id = id;
    }



    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(String id) {
        this.id = id;
    }


}
