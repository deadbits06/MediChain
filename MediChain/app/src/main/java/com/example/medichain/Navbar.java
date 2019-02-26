package com.example.medichain;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.annotation.NonNull;
import android.support.design.widget.NavigationView;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.RequestQueue;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.Volley;
import com.example.medichain.activities.MyPatient;

import org.json.JSONObject;

public class Navbar extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

//    private final String JSON_URL = "http://192.168.43.207:1500/logout"  ;

    private DrawerLayout mDrawerLayout;
    private ActionBarDrawerToggle mToggle;
    TextView tv_doc ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_navbar);

        Bundle bundle ;
        bundle=getIntent().getExtras();

        String value = bundle.getString("user") ;
//        tv_doc = (TextView)findViewById(R.id.tv_doctor);
//        tv_doc.setText(value);



        mDrawerLayout = (DrawerLayout) findViewById(R.id.drawer);
        mToggle = new ActionBarDrawerToggle(this, mDrawerLayout, R.string.open, R.string.close);

        mDrawerLayout.addDrawerListener(mToggle);
        mToggle.syncState();
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);


        NavigationView navigationView = (NavigationView) findViewById(R.id.navigation_view);
        navigationView.setNavigationItemSelectedListener(this);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        if (mToggle.onOptionsItemSelected(item)) {

            return true;
        }
        Intent i = new Intent(Navbar.this, MyPatient.class);
        startActivity(i);
        return super.onOptionsItemSelected(item);
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
        final int id;
        id = menuItem.getItemId();


        if (id == R.id.mypatient) {
            Toast.makeText(this, "patient ", Toast.LENGTH_SHORT).show();
            Intent i = new Intent(Navbar.this, MyPatient.class);
            startActivity(i);

        }
        if (id == R.id.logout) {
            String url="http://192.168.43.207:1500/logout";
            RequestQueue requestQueue = Volley.newRequestQueue(Navbar.this);
            JSONObject jsonObject = new JSONObject();
            try {
                jsonObject.put("user","alok");
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
            final String requestBody = jsonObject.toString();

            ConnectionManager.sendData(requestBody, requestQueue, url, new ConnectionManager.VolleyCallback() {
                SharedPreferences sharedPref = getSharedPreferences("sacred", Context.MODE_PRIVATE);
                SharedPreferences.Editor editor = sharedPref.edit();
                @Override
                public void onSuccessResponse(String result){
                    System.out.print("Bool"+result);

                    if(sharedPref.contains("sacred")) {
                        if(sharedPref.getBoolean("sacred",true)) {

                            if(result.equals("Logged out")){

                                // Toast.makeText(Login.this, result, Toast.LENGTH_SHORT).show();

                                Intent i = new Intent(Navbar.this, Login.class);

                                startActivity(i);
                            }

                            else{

                                Toast.makeText(Navbar .this,"Error ",Toast.LENGTH_SHORT).show();
                            }




                        }
                    }
                    else
                    {
                        editor.putBoolean("sacred",false);

                        editor.commit();
                        //boolean check = sharedPref.getBoolean("abcd",false);
                    }




                }

                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast toast = Toast.makeText(Navbar.this,
                            "Could not logout, please try again." + error,
                            Toast.LENGTH_LONG);

                    toast.show();
                }



            });



//            Toast.makeText(this, "logout", Toast.LENGTH_SHORT).show();
//            Intent i = new Intent(Navbar.this, Login.class);
//            startActivity(i);
           // finish();
        }

        return false;

    }

}
