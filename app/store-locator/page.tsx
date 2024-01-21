'use client';

import Loading from '@/components/startbucks/loading';
import useBranchStore from '@/store/store-branch';
import { Loader } from '@googlemaps/js-api-loader';
import { RadioGroup } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useEffect, useRef, useState } from 'react';

function StoreLocator() {
  const { currentBranch, setCurrentBranch } = useBranchStore();
  const [stores, setStore] = useState<any>([]);
  const [isLoader, setIsLoader] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [map, setMap] = useState<google.maps.Map>();
  const [markers, setMarkers] = useState<any[]>([]);
  const containerMarkers: google.maps.Marker[] = [];
  const radioRef = useRef<HTMLDivElement[]>([]);
  const locationButtonRef = useRef<HTMLDivElement>(null);
  const currentMarkerRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const incasePosition = { lat: 25.19, lng: 55.28 };
  const getPositionFromGeo = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(pos);
        },
        () => {
          resolve(incasePosition);
        }
      );
    });
  };
  const onClickZoomButton = (event: any) => {
    const info = event.target.alt;
    const currentZoom = map!.getZoom() ?? 15;
    info === 'zoom-in'
      ? map!.setZoom(currentZoom + 1)
      : map!.setZoom(currentZoom - 1);
  };
  const onClickCurrentLocationButton = async () => {
    setLoading(true);
    const pos = (await getPositionFromGeo()) as google.maps.LatLng;
    setLoading(false);
    createHTMLMarker(pos);
    map!.setCenter(pos);
  };

  const clearMarkers = () => {
    for (let i = 0; i < containerMarkers.length; i++) {
      containerMarkers[i]?.setMap(null);
    }
    setStore((stores: any) => stores.filter((store: any) => store == false));
    setMarkers((markers: any) =>
      markers.filter((markers: any) => markers == false)
    );
  };
  const createMarker = (
    place: google.maps.places.PlaceResult,
    map: google.maps.Map,
    index: number
  ) => {
    if (!place.geometry || !place.geometry.location) return;
    let _marker: google.maps.Marker;
    if (index === 0) {
      _marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        icon: {
          url: '/nearby-store.svg',
          size: { width: 48, height: 59 } as google.maps.Size,
        },
        title: place.place_id,
      });
    } else {
      _marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
        icon: {
          url: '/spot.svg',
          size: { width: 16, height: 16 } as google.maps.Size,
        },
        title: place.place_id,
      });
    }

    _marker.addListener('click', () => {
      map.panTo(place?.geometry?.location ?? incasePosition);

      radioRef!.current[index]!.dispatchEvent(
        new Event('click', { bubbles: true })
      );
      containerMarkers.forEach((marker) => {
        marker.getTitle() == _marker.getTitle()
          ? marker.setIcon({
              url: '/nearby-store.svg',
              size: { width: 48, height: 59 } as google.maps.Size,
            })
          : marker.setIcon({
              url: '/spot.svg',
              size: { width: 16, height: 16 } as google.maps.Size,
            });
      });
    });
    containerMarkers.push(_marker);
    setMarkers((markers) => [...markers, _marker]);
  };
  const createStoreList = (
    place: google.maps.places.PlaceResult,
    map: google.maps.Map,
    i: number
  ) => {
    if (!place) return;

    const addressInfo = place!.formatted_address!.trim().split('-');
    const title = addressInfo[0] ?? '';
    if (addressInfo) {
      addressInfo.shift();
      addressInfo.pop();
    }
    const address = addressInfo.join(' ') ?? '';
    const location = place?.geometry?.location;
    const isOpen =
      place?.opening_hours?.isOpen() ?? place!.opening_hours?.open_now;
    const openingHours = place?.opening_hours?.periods![0]?.close?.time ?? '';
    const centerLat = map?.getCenter()?.lat() ?? incasePosition.lat;
    const centerLon = map?.getCenter()?.lng() ?? incasePosition.lng;
    const storeLat = location?.lat() ?? incasePosition.lat;
    const storeLon = location?.lng() ?? incasePosition.lng;
    const id = place!['place_id'];
    const dist = distance(centerLat, centerLon, storeLat, storeLon); //to miles
    const storeInfo = {
      title,
      address,
      dist,
      isOpen,
      openingHours,
      id,
      location,
    };
    setStore((stores: any) => [...stores, storeInfo]);
    if (i == 0)
      radioRef?.current[0]?.dispatchEvent(
        new Event('click', { bubbles: true })
      );
  };
  const createHTMLMarker = (position: google.maps.LatLng) => {
    const markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
      map: map,
      position: position,
      content: currentMarkerRef.current,
      title: 'currentMarker',
    };

    const marker = new google.maps.marker.AdvancedMarkerElement(markerOptions);
  };
  const initAutoComplete = (
    service: google.maps.places.PlacesService,
    map: google.maps.Map
  ) => {
    const options = {
      componentRestrictions: { country: ['kr', 'ae'] },
      fields: ['geometry', 'name'],
      strictBounds: false,
    };
    const autoComplete = new google.maps.places.Autocomplete(
      searchBarRef.current!,
      options
    );
    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      const request = {
        query: place.name + 'starbucks',
        // keyword: place.name + 'starbucks',
        rankBy: google.maps.places.RankBy.DISTANCE,
        location: map.getCenter(),
      };
      service.textSearch(
        request,
        (
          results: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            clearMarkers();
            for (let i = 0; i < results.length; i++) {
              service.getDetails(
                { placeId: results[i]!['place_id'] ?? '' },
                (res) => {
                  createStoreList(res!, map, i);
                  createMarker(res!, map, i);
                }
              );
            }
            if (results[0]!.geometry!.viewport) {
              map.fitBounds(results[0]!.geometry!.viewport);
            } else {
              map.setCenter(results[0]!.geometry!.location ?? incasePosition);
            }
          }
        }
      );
      // service.nearbySearch(
      //   request,
      //   (
      //     results: google.maps.places.PlaceResult[] | null,
      //     status: google.maps.places.PlacesServiceStatus
      //   ) => {
      //     if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      //       clearMarkers();

      //       for (let i = 0; i < results.length; i++) {
      //         service.getDetails(
      //           { placeId: results[i]!['place_id'] ?? '' },
      //           (res: any) => {
      //             createStoreList(res!, map);
      //             createMarker(res!, map, i);
      //           }
      //         );
      //       }
      //       if (results[0]!.geometry!.viewport) {
      //         map.fitBounds(results[0]!.geometry!.viewport);
      //       } else {
      //         map.setCenter(results[0]!.geometry!.location ?? incasePosition);
      //         map.setZoom(17);
      //       }
      //     }
      //   }
      // );
    });
  };

  const searchStore = (
    service: google.maps.places.PlacesService,
    map: google.maps.Map
  ) => {
    const request = {
      query: 'starbucks',
      location: map.getCenter(),
    };
    service.textSearch(
      request,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          clearMarkers();

          for (let i = 0; i < results.length; i++) {
            service.getDetails(
              { placeId: results[i]!['place_id'] ?? '' },
              (res) => {
                createStoreList(res!, map, i);
                createMarker(res!, map, i);
              }
            );
          }
        }
      }
    );
  };
  const distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance: number = R * c * 0.621371; // 두 지점 간의 거리 (단위: km)
    return distance.toFixed(2);
  };
  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };
  const initMap = async () => {
    console.log('init Map');

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string,
      version: 'weekly',
      libraries: ['marker', 'places'],
    });
    const { Map } = await loader.importLibrary('maps');
    const { PlacesService } = await loader.importLibrary('places');

    const mapOptions: google.maps.MapOptions = {
      zoom: 15,
      mapId: 'd6ba8c8b99db42e0',
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      scaleControl: true,
      rotateControl: true,
      zoomControl: false,
      disableDoubleClickZoom: true,
      gestureHandling: 'greedy',
    };
    const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
    setMap(map);
    map.setCenter(incasePosition);
    map.addListener('dragend', () => {
      searchStore(service, map);
    });
    const service = new PlacesService(map);
    searchStore(service, map);
    initAutoComplete(service, map);

    setTimeout(() => {
      if (currentBranch) {
        map.setCenter(currentBranch.location);
      }
      setIsLoader(true);
    }, 1000);
  };
  const onStoreChange = (id: string) => {
    const store = stores.find((store: any) => store.id === id);
    map!.panTo(store.location);
    setCurrentBranch(store);
    markers.forEach((marker) => {
      marker.getTitle() == id
        ? marker.setIcon({
            url: '/nearby-store.svg',
            size: { width: 48, height: 59 } as google.maps.Size,
          })
        : marker.setIcon({
            url: '/spot.svg',
            size: { width: 16, height: 16 } as google.maps.Size,
          });
    });
  };
  useEffect(() => {
    initMap();
  }, []);

  return (
    <div className="flex max-lg:flex-col lg:pt-[6.1876rem] pt-[5rem]">
      {/* 정보영역 */}
      <div className=" relative order-1 flex   basis-[40%]  flex-col px-5 max-lg:order-2 max-lg:w-full">
        {/* 서치 바 */}
        <div className=" sticky left-0 top-0 flex h-[70px] w-full  items-center justify-between bg-white py-4 max-lg:px-5">
          <div className="flex basis-[80%] justify-between border-b-2 px-4  leading-7">
            <div className="block w-full basis-[90%]">
              <input
                ref={searchBarRef}
                type="text"
                placeholder="Find a store"
                className=" block w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl outline-none"
              />
            </div>
            <button className="flex w-full basis-[10%] items-center justify-center">
              <Image alt="search" src="/search.svg" width={24} height={24} />
            </button>
          </div>
          <div className="flex basis-[20%] items-center justify-end">
            <button className=" rounded-[3.125rem] border-[1px] border-solid border-seagreen px-4 py-2 text-seagreen hover:bg-lightcyan">
              Filter
            </button>
          </div>
        </div>
        {/* 스토어리스트 */}
        {stores && stores[0] && (
          <RadioGroup
            defaultValue={stores[0].id}
            onChange={onStoreChange}
            className=" max-h-[calc(100vh-6.1876rem-70px)] snap-y snap-mandatory overflow-y-auto  max-lg:max-h-[calc(100vh-21.1876rem-70px)] "
          >
            {stores.map(
              (
                {
                  id,
                  title,
                  address,
                  dist,
                  isOpen,
                  openingHours,
                }: {
                  id: any;
                  title: any;
                  address: any;
                  dist: any;
                  isOpen: any;
                  openingHours: any;
                },
                i: number
              ) => (
                <RadioGroup.Option
                  as={Fragment}
                  key={i}
                  value={id}
                  ref={(el) =>
                    ((radioRef!.current[i] as HTMLElement | null) = el)
                  }
                >
                  {({ checked }) => (
                    <div
                      className={` mb-2 flex w-full cursor-pointer snap-start items-center justify-between rounded-[0.5rem]    px-[1.5rem] py-[1.12rem]  ${
                        checked
                          ? 'border-[2px] border-solid bg-seagreen border-seagreen bg-opacity-10'
                          : ''
                      } `}
                    >
                      <div className="flex flex-col items-start gap-y-1">
                        <div className="font-bold">{title}</div>
                        <div className="text-sm">{address}</div>
                        <div className="text-sm">
                          <span>{dist} miles away</span> ·{' '}
                          <span>{isOpen ? 'Open ' : 'Closed'}</span>
                          {isOpen ? (
                            <span>
                              {openingHours == '0000'
                                ? '24Hours'
                                : openingHours}
                            </span>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <div className="flex justify-end gap-x-4 ">
                          <Image
                            alt="bookmark"
                            src="/bookmark.svg"
                            width={24}
                            height={24}
                          />
                          <Image
                            alt="store-info"
                            src="/store-info.svg"
                            width={24}
                            height={24}
                          />
                        </div>
                        <Link
                          href={{
                            pathname: '/menu',
                            query: {
                              // path: '/menu/hotcoffees'
                            },
                          }}
                        >
                          <button
                            className={`${
                              checked ? 'visible' : 'invisible'
                            } block rounded-[3.125rem] bg-seagreen px-[1rem] py-[0.5rem] text-sm text-white hover:opacity-90 `}
                          >
                            Order Here
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </RadioGroup.Option>
              )
            )}
          </RadioGroup>
        )}
      </div>
      {/* 지도영역 */}
      <div className="relative order-2 h-[calc(100vh-6.1876rem)]  basis-[60%] max-lg:order-1 max-lg:min-h-[15rem] max-lg:w-full z-10">
        <div
          className={`absolute origin-left-right h-full w-full z-50 ${
            isLoader ? 'hidden' : ''
          }`}
        >
          <Loading />
        </div>
        <div
          className="absolute left-0 top-0 h-full w-full -z-0"
          ref={mapRef}
        ></div>
        {/* 현재위치 마커 */}
        <div
          ref={currentMarkerRef}
          className={`absolute flex items-center justify-center -z-10 left-[50%] top-[50%] ${
            isLoader ? '' : 'hidden'
          }`}
        >
          <div className="absolute h-4 w-4 animate-ping rounded-[50%] bg-blue-600 opacity-50 ring-2"></div>
          <div className="h-3 w-3 rounded-[50%] bg-blue-600 ring-2"></div>
        </div>
        {/* 줌인 줌아웃 버튼 */}
        <div className="absolute bottom-[5rem] right-[1.5rem] z-40 flex flex-col bg-white shadow">
          <div>
            <Image
              src="/zoom-in.svg"
              alt="zoom-in"
              width={24}
              height={24}
              onClick={onClickZoomButton}
            />
          </div>
          <div>
            <Image
              src="/zoom-out.svg"
              alt="zoom-out"
              width={24}
              height={24}
              onClick={onClickZoomButton}
            />
          </div>
        </div>
        {/* 현재위치찾기 버튼 */}
        <div
          ref={locationButtonRef}
          className=" absolute bottom-[2rem] right-[1rem] z-40 "
        >
          <Image
            src="/current-position.svg"
            alt="current-position.svg"
            width={40}
            height={40}
            onClick={onClickCurrentLocationButton}
            className={`${
              isLoading ? 'animate-spin' : ''
            } rounded-[50%] bg-white p-[0.44rem] shadow`}
          />
        </div>
      </div>
    </div>
  );
}
export default React.memo(StoreLocator);
