"use strict";

// Static initialization blocks are used to initialize static fields in a class if the initialization requires more than a simple expression.
class DataBaseConnection {
  static #connection;
  static #isConnected = false;

  static {
    // Connect to the database based on the environment. Here just a dummy example.
    if (true) {
      if (DataBaseConnection.connectToDevDb()) {
        DataBaseConnection.#isConnected = true;
      }
    } else {
      DataBaseConnection.connectToProdDb();
    }
  }

  static connectToDevDb() {}
  static connectToProdDb() {}
}
