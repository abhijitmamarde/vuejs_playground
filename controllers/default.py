# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

# -------------------------------------------------------------------------
# This is a sample controller
# - index is the default action of any application
# - user is required for authentication and authorization
# - download is for downloading files uploaded in the db (does streaming)
# -------------------------------------------------------------------------
import gluon.contrib.simplejson
from tinydb import TinyDB, Query
from tinydb.operations import delete

events_db = TinyDB('./applications/vsd/events.json')
events_tbl = events_db.table("events")


def events():
    return locals()


def get_events():
    try:

        events = [
            dict(
                id=e.eid,
                name=e['name'],
                description=e['description'],
                date=e['date']) for e in events_tbl.all()
        ]

        return gluon.contrib.simplejson.dumps(events)
    except Exception as err:
        print "Err while fetching events: %s" % err


def add_event():
    print "inside add event"
    try:
        print request.vars
        name = request.vars['name']
        date = request.vars['date']
        description = request.vars['description']
        print "addding event:"
        print name

        eid = events_tbl.insert(
            dict(
                name=name,
                date=date,
                description=description, ))
        return eid
    except Exception as err:
        print "Error while adding event: %s" % err

def remove_event():
    print "inside remove event"

    try:
        print request.vars
        eid = int(request.vars['id'])
        print "deleting eid: %d" % eid
        Event = Query()
        events_tbl.remove(eids=[eid])

        return True
    except Exception as err:
        print "Error while removing event: %s" % err



def index():
    """
    example action using the internationalization operator T and flash
    rendered by views/default/index.html or views/generic.html

    if you need a simple wiki simply replace the two lines below with:
    return auth.wiki()
    """
    response.flash = T("Hello World")
    return dict(message=T('Welcome to web2py!'))


def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/bulk_register
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    also notice there is http://..../[app]/appadmin/manage/auth to allow administrator to manage users
    """
    return dict(form=auth())


@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()
