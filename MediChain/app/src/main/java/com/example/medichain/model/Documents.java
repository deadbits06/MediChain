package com.example.medichain.model;

public class Documents {

    private String treatment_name ;
    private String document_url ;

    public Documents() {
    }

    public Documents(String treatment_name, String document_url) {
        this.treatment_name = treatment_name;
        this.document_url = document_url;
    }



    public String getTreatment_name() {
        return treatment_name;
    }

    public String getDocument_url() {
        return document_url;
    }


    public void setTreatment_name(String treatment_name) {
        this.treatment_name = treatment_name;
    }

    public void setDocument_url(String document_url) {
        this.document_url = document_url;
    }
}
