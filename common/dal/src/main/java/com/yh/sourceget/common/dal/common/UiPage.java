package com.yh.sourceget.common.dal.common;

import java.util.ArrayList;
import java.util.List;

public class UiPage {

    public Long   total;

    public List   rows    = new ArrayList<Object>();

    public List   columns = new ArrayList<Object>();

    public Object other;

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public List getRows() {
        return rows;
    }

    public void setRows(List rows) {
        this.rows = rows;
    }

    public List getColumns() {
        return columns;
    }

    public void setColumns(List columns) {
        this.columns = columns;
    }

    public Object getOther() {
        return other;
    }

    public void setOther(Object other) {
        this.other = other;
    }
}
