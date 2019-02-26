package com.example.medichain;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.widget.TextView;

import com.example.medichain.activities.MyPatient;

public class nav extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    private DrawerLayout drawer ;

    TextView tv ;
    String st ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_nav);

//        tv = findViewById(R.id.tv_doctor);
//        st=getIntent().getExtras().getString("value") ;
//        tv.setText(st);


      Toolbar toolbar = findViewById(R.id.toolbar);
      setSupportActionBar(toolbar);

        drawer  = findViewById(R.id.drawer_layout) ;

        NavigationView navigationView = findViewById(R.id.nav_view) ;
        navigationView.setNavigationItemSelectedListener(this);

        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(this,drawer, R.string.open , R.string.close );

        drawer.addDrawerListener(toggle);
        toggle.syncState();





        if(savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,
                    new MyPatientFragment()).commit();


            navigationView.setCheckedItem(R.id.nav_mypatients);

//            Intent i = new Intent(this,MyPatient.class);
//            startActivity(i);

        }
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        switch(item.getItemId()) {

            case R.id.nav_mypatients:
//                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container ,
//                        new MyPatientFragment()).commit() ;

                Intent i = new Intent(this, MyPatient.class);
                startActivity(i);
                break;

            case R.id.nav_help:
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,
                        new HelpFragment()).commit();
                break;


            case R.id.nav_notification:
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,
                        new NotificationFragment()).commit();
                break;


            case R.id.nav_logout:
                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,
                        new LogoutFragment()).commit();
                break;

        }

        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    @Override
    public void onBackPressed() {

        if(drawer.isDrawerOpen(GravityCompat.START)){

            drawer.closeDrawer(GravityCompat.START);
        } else {

            super.onBackPressed();
        }
    }
}
