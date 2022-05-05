function TankController(tank) {
    this._tank = tank;
}

TankController.prototype.notify = function(event) {
    if (event.name == Keyboard.Event.KEY_DOWN) {
        this._keyDown(event.key);
    } else if (event.name == Keyboard.Event.KEY_UP) {
        this._keyUp(event.key);
    }
};

TankController.prototype._keyDown = function(key) {
    if (key == Keyboard.Key.LEFT) {
        this._tank.setDirection(Tank.Direction.LEFT);
        this._tank.toNormalSpeed();
    } else if (key == Keyboard.Key.RIGHT) {
        this._tank.setDirection(Tank.Direction.RIGHT);
        this._tank.toNormalSpeed();
    } else if (key == Keyboard.Key.UP) {
        this._tank.setDirection(Tank.Direction.UP);
        this._tank.toNormalSpeed();
    } else if (key == Keyboard.Key.DOWN) {
        this._tank.setDirection(Tank.Direction.DOWN);
        this._tank.toNormalSpeed();
    }
};

TankController.prototype._keyUp = function(key) {
    if (this._tank.getDirection() == Tank.Direction.LEFT && key == Keyboard.Key.LEFT ||
        this._tank.getDirection() == Tank.Direction.RIGHT && key == Keyboard.Key.RIGHT ||
        this._tank.getDirection() == Tank.Direction.UP && key == Keyboard.Key.UP ||
        this._tank.getDirection() == Tank.Direction.DOWN && key == Keyboard.Key.DOWN) {
        this._tank.stop();
    }
};