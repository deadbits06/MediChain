package com.example.medichain.adapters;

import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.medichain.activities.Details;
import com.example.medichain.model.Documents;
import com.example.medichain.model.Patients;

import com.example.medichain.R  ;

import java.util.List;

public class RecyclerViewAdapter extends  RecyclerView.Adapter<RecyclerViewAdapter.MyViewHolder> {


    private Context mContext ;
    private List<Patients> mData ;


    public RecyclerViewAdapter(Context mContext, List<Patients> mData) {
        this.mContext = mContext;
        this.mData = mData;
    }


    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view ;
        LayoutInflater inflater = LayoutInflater.from(mContext);
        view = inflater.inflate(R.layout.patients_row_item, parent , false) ;
        final MyViewHolder viewHolder = new MyViewHolder(view) ;

        viewHolder.view_container.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent in= new Intent(mContext, Details.class);
                in.putExtra("patient_name", mData.get(viewHolder.getAdapterPosition()).getName());
                in.putExtra("patient_id", mData.get(viewHolder.getAdapterPosition()).getId());

                mContext.startActivity(in);
            }
        });


        return viewHolder ;
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder myViewHolder, int i) {

        myViewHolder.p_name.setText(mData.get(i).getName());
        myViewHolder.p_id.setText(mData.get(i).getId());


    }

    @Override
    public int getItemCount() {
        return mData.size();
    }



    public static class MyViewHolder extends RecyclerView.ViewHolder{


       public TextView p_name ;
        public TextView p_id ;

        LinearLayout view_container ;




        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            view_container = itemView.findViewById(R.id.container);
            p_name = itemView.findViewById(R.id.patient_name) ;
            p_id = itemView.findViewById(R.id.patient_id);

        }
    }

}


