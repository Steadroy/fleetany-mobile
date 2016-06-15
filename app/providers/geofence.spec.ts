import { Events, Platform, NavController } from 'ionic-angular';
import { UserData } from './user-data';
import { GeofenceProvider } from './geofence';
import { Http, BaseRequestOptions } from 'angular2/http';
import { MockBackend } from 'angular2/http/testing'

let geofenceProvider: GeofenceProvider = null;

function publishStub(topic: string):any { return null; }

describe('GeofenceProvider', () => {

  beforeEach(() => {   
    let events: Events = new Events();
    let platform: Platform = new Platform();
    let http: Http = new Http(new MockBackend(), new BaseRequestOptions());
    let userData: UserData = new UserData(events, http, platform);
    spyOn(events, 'publish').and.callFake(publishStub); 
    geofenceProvider = new GeofenceProvider(events, platform, userData);
  });

  it('initialises', () => {
    expect(geofenceProvider).not.toBeNull();
  });

  it('should listen to userData events', () => {
    spyOn(geofenceProvider.events, 'subscribe').and.callFake(publishStub);
    geofenceProvider.listenToUserDataEvents();
    expect(geofenceProvider.events.subscribe.calls.count()).toEqual(1);
  });
   
});