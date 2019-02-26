package com.example.medichain.activities;

import android.content.Intent;
import android.support.design.widget.CollapsingToolbarLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.example.medichain.ConnectionManager;
import com.example.medichain.PDF;
import com.example.medichain.R ;
import com.example.medichain.adapters.RecyclerViewAdapter;
import com.example.medichain.adapters.RecyclerViewAdapterDoc;
import com.example.medichain.model.Documents;
import com.example.medichain.model.Patients;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;


public class Details extends AppCompatActivity {


    private final String URL = "http://192.168.43.31:8080/patientData" ;
    private JsonArrayRequest request ;
    private RequestQueue  requestQueue ;
    private List<Documents> lstDocuments ;
    private RecyclerView recyclerView ;



    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details);


        TextView txtview = (TextView) findViewById(R.id.doc_url);



        //hide toolbar
        getSupportActionBar().hide();

        //Recieve dATA

        String pname = getIntent().getExtras().getString("patient_name") ;
        String pid = getIntent().getExtras().getString("patient_id") ;


//        get details
//        String dtails = getIntent().getExtras().getString("From patient_roll") ;
//


        CollapsingToolbarLayout collapsingToolbarLayout = findViewById(R.id.collpsingtoolbar_id);


        collapsingToolbarLayout.setTitleEnabled(true);


        TextView tv_name = findViewById(R.id.aa_patient_name);
        TextView tv_id = findViewById(R.id.aa_patient_id);


//        to get desc.
//        TextView tv_description = findViewById(R.id.aa_description);



        //Setting value to each view
        tv_name.setText(pname);
        tv_id.setText(pid);

        //tv_description.setText()

        collapsingToolbarLayout.setTitle(pname);



        // set image using glide



        lstDocuments = new ArrayList<>() ;
        recyclerView = findViewById(R.id.recyclerviewDetails) ;
        jsonrequest();



    }


    private void jsonrequest(){

        Log.i("Alok","Aya andar");

        RequestQueue requestQueue = Volley.newRequestQueue(Details.this);

        //Get the bundle
        Bundle bundle = getIntent().getExtras();


        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("user", bundle.getString("user"));

        }
        catch (Exception e)
        {
            e.printStackTrace();
        }



        ConnectionManager.sendData(jsonObject.toString(), requestQueue, URL, new ConnectionManager.VolleyCallback() {
            @Override
            public void onSuccessResponse(String result) {
                try {
                    JSONArray jsonArray = new JSONArray(result);
                    //System.out.println("Sirf array hai"+jsonArray);


                    for(int i =0; i<jsonArray.length();i++)
                    {
                        JSONObject jsonObj = jsonArray.getJSONObject(i);
                        Documents documents = new Documents();

                        documents.setDocument_url(jsonObj.getString("id"));
                        documents.setTreatment_name(jsonObj.getString("PatientName"));

//                    System.out.println(jsonObj.getString("id"));
//
//                    System.out.println(jsonObj.getString("PatientName"));

                        lstDocuments.add(documents);
                    }




                    // JSONObject jasonObject = new JSONObject(result);
                }
                catch (Exception e )
                {
                    Toast.makeText(Details.this,""+e,Toast.LENGTH_SHORT).show();
                }
                Toast.makeText(Details.this,result,Toast.LENGTH_SHORT).show();


                setuprecyclerview (lstDocuments);

            }

            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });




    }


    private void setuprecyclerview ( List<Documents> lstDocuments) {

        RecyclerViewAdapterDoc myadapter = new RecyclerViewAdapterDoc ( this , lstDocuments) ;
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        recyclerView.setAdapter(myadapter);


    }




}
