module.exports = {
  getRiders: (db, limit, offset) => {
    return db.all('SELECT * FROM Rides LIMIT ? OFFSET ?', [limit, offset]);
  },
  getRiderById: (db, id) => {
    return db.all(`SELECT * FROM Rides WHERE rideID = ?`, id);
  },
  addRiders: async (db, params) => {
    if (!params) throw new Error('No rider parameters to add');
    const values = [
      params.startLat,
      params.startLong,
      params.endLat,
      params.endLong,
      params.riderName,
      params.driverName,
      params.driverVehicle,
    ];
    const {lastID} = await db.run(
        `INSERT INTO Rides
        (
          startLat, 
          startLong, 
          endLat, 
          endLong, 
          riderName, 
          driverName, 
          driverVehicle
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        values,
    );

    return db.all('SELECT * FROM Rides WHERE rideID = ?', lastID);
  },
};
