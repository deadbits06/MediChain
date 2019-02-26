package com.example.medichain.activities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.RequestQueue;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.example.medichain.ConnectionManager;
import com.example.medichain.R;
import com.example.medichain.adapters.RecyclerViewAdapter;
import com.example.medichain.model.Patients;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class MyPatient extends AppCompatActivity {

    private final String JSON_URL = "http://192.168.43.31:8080/patientData"  ;

    private JsonArrayRequest request ;
    private RequestQueue requestQueue ;
    private List<Patients> lstPatients ;
    private RecyclerView recyclerView ;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_patient);

        lstPatients = new ArrayList<>() ;
        recyclerView = findViewById(R.id.recyclerviewid) ;
        jsonrequest();


    }


    private void jsonrequest() {
        Log.i("Alok","Aya andar");

        RequestQueue requestQueue = Volley.newRequestQueue(MyPatient.this);

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


        ConnectionManager.sendData(jsonObject.toString(), requestQueue, JSON_URL, new ConnectionManager.VolleyCallback() {
            @Override
            public void onSuccessResponse(String result) {
            try {
                JSONArray jsonArray = new JSONArray(result);
                //System.out.println("Sirf array hai"+jsonArray);


                for(int i =0; i<jsonArray.length();i++)
                {
                    JSONObject jsonObj = jsonArray.getJSONObject(i);
                    Patients patients = new Patients();

                    patients.setId(jsonObj.getString("id"));
                    patients.setName(jsonObj.getString("PatientName"));

//                    System.out.println(jsonObj.getString("id"));
//
//                    System.out.println(jsonObj.getString("PatientName"));

                    lstPatients.add(patients);
                }




               // JSONObject jasonObject = new JSONObject(result);
            }
            catch (Exception e )
            {
                Toast.makeText(MyPatient.this,""+e,Toast.LENGTH_SHORT).show();
            }
                Toast.makeText(MyPatient.this,result,Toast.LENGTH_SHORT).show();


                setuprecyclerview (lstPatients);

            }

            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });





//        request = new JsonArrayRequest(JSON_URL, new Response.Listener<JSONArray>() {
//            @Override
//            public void onResponse(JSONArray response) {
//
//               JSONObject jasonObject = null ;
//
//                for (int i=0 ; i<response.length() ; i++) {
//
//                    try {
//                        jasonObject = response.getJSONObject(i);
//                        Patients patients = new Patients();
//                        patients.setName(jasonObject.getString( "user"));
//                        patients.setId(jasonObject.getString("pass"));
//
//
//                        lstPatients.add(patients) ;
//
//
//
//                    } catch (JSONException e ) {
//
//                        e.printStackTrace();
//                    }
//
//
//                }
//
//
//                setuprecyclerview(lstPatients);
//
//
//            }
//        }, new Response.ErrorListener() {
//            @Override
//            public void onErrorResponse(VolleyError error) {
//
//            }
//        });
//
//
//      requestQueue = Volley.newRequestQueue(MyPatient.this) ;
//      requestQueue.add(request) ;
//
   }

    private void setuprecyclerview ( List<Patients> lstPatients) {

        RecyclerViewAdapter myadapter = new RecyclerViewAdapter(this , lstPatients) ;
        recyclerView.setLayoutManager(new LinearLayoutManager(this ));

        recyclerView.setAdapter(myadapter);


     }

}
