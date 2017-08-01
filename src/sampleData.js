// Property
export default {
  id: 'property-1493925806888',
  floorplans: [
    {
      id: 'floorplan-1493925806940',
      name: 'First Floor',
      rooms: [ 'room-1493925821533', 'room-1493925891930' ]
    },
    {
      id: 'floorplan-2493925806940',
      name: 'Detached Garage',
      rooms: []
    },
    {
      id: 'floorplan-3493925806940',
      name: 'Basement',
      rooms: []
    }
  ],
  rooms: [
    {
      captures: [ 'capture-Front-Door-capture-1' ],
      dimensions: { w: 0.19951923076923078, h: 0.10033444816053512 },
      id: 'room-1493925821533',
      name: 'Front Door',
      position: { x: 0.6382211538461539, y: 0.7073578595317725 }
    },
    {
      captures: [ 'capture-living-room-capture-1', 'capture-living-room-capture-2' ],
      dimensions: { w: 0.19951923076923078, h: 0.3595317725752508 },
      id: 'room-1493925891930',
      name: 'Living Room',
      position: { x: 0.8389423076923077, y: 0.3377926421404682 }
    }
  ],
  captures: [
    {
      date: '2017:05:04 12:23:01-07:00',
      fileName: '100ricoh-r0010284.jpg',
      hotspots: [ 'hotspot-move-1493927738057' ],
      id: 'capture-Front-Door-capture-1',
      name: 'front door capture 1',
      note: { html: '<p><br></p>', markdown: '​\n' },
      position: { x: 0.5, y: 0.6607142857142857 },
      screenshots: [ 'screenshot-closet-1-1493918031629' ]
    },
    {
      date: '2017:05:04 12:44:48-07:00',
      fileName: '100ricoh-r0010294.jpg',
      hotspots: [ 'hotspot-blur-1493927697905' ],
      id: 'capture-living-room-capture-1',
      name: 'living room capture 1',
      note: { html: '<p><br></p>', markdown: '​\n' },
      position: { x: 0.08641975308641975, y: 0.919431279620853 },
      screenshots: []
    },
    {
      date: '2017:05:04 12:47:59-07:00',
      fileName: '100ricoh-r0010299.jpg',
      hotspots: [ 'hotspot-info-1493927661764', 'hotspot-move-1493927713666' ],
      id: 'capture-living-room-capture-2',
      name: 'living roomc capture 2',
      note: { html: '<p><br></p>', markdown: '​\n' },
      position: { x: 0.47530864197530864, y: 0.47393364928909953 },
      screenshots: []
    }
  ],
  hotspots: [
    {
      dimensions: { w: 3, h: 3 },
      id: 'hotspot-info-1493927661764',
      matrix: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
      meta: { description: 'thermador range' },
      position: { x: 27.02404483209286, y: -5.056321881160432, z: 11.719917223106918 },
      rotation: { x: -10.084057194302492, y: -113.44564343590304, z: 0 },
      type: 'info'
    },
    {
      dimensions: {w: 3, h: 3},
      id: 'hotspot-move-1493927713666',
      matrix: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
      meta: { roomid: 'room-1493926045016', captureId: 'SID_0001-temp hall-capture-1' },
      position: {x: 29.725945992060474, y: -1.4898066056475074, z: 1.6426501564409692},
      rotation: {x: -2.8647889756541147, y: -93.16293748827192, z: 0},
      type: 'move'
    },
    {
      dimensions: {w: 3, h: 3},
      id: 'hotspot-blur-1493927697905',
      matrix: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
      meta: {},
      position: {x: 31.52415855652295, y: 0.9275856802407966, z: -14.377295165340369},
      rotation: {x: -6.990085100596044, y: -82.50592249883854, z: 0},
      type: 'blur'
    },
    {
      dimensions: {w: 3, h: 3},
      id: 'hotspot-move-1493927738057',
      matrix: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
      meta: { roomid: 'room-1493925992195', captureId: 'SID_0001-kitchen-capture-1' },
      position: {x: 29.673708223036243, y: -3.3377128691522855, z: 0.39182530052680564},
      rotation: {x: -6.531718864491381, y: -90.75651474872237, z: 0},
      type: 'move'
    }
  ],
  screenshots: [
    {
      fileName: 'screenshot-closet-1-1493918031629.png',
      id: 'screenshot-closet-1-1493918031629',
      matrix: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
      name: 'Closet',
      note: { html: '<p><br></p>', markdown: '​\n' },
      position: { x: undefined, y: undefined, z: undefined }
    }
  ]
}
