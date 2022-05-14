function Tank(eventManager) {
    Sprite.call(this, eventManager);

    eventManager.addSubscriber(this,
        [Bullet.Event.DESTROYED,
        CollisionDetector.Event.COLLISION,
        CollisionDetector.Event.OUT_OF_BOUNDS,
        TankStateAppearing.Event.END,
        TankStateInvincible.Event.END]);

    this._w = Globals.UNIT_SIZE;
    this._h = Globals.UNIT_SIZE;

    this._type = Tank.Type.PLAYER_1;
    this._state = new TankStateNormal(this);
    this._player = true;

    this._normalSpeed = 2;
    this._bulletSize = Globals.TILE_SIZE / 2;
    this._bulletSpeed = 4;

    // turn smoothing sensitivity
    this._turnSmoothSens = Globals.TILE_SIZE - 6;
    this._turnRoundTo = Globals.TILE_SIZE;

    this._eventManager.fireEvent({ 'name': Tank.Event.CREATED, 'tank': this });
}
Tank.subclass(Sprite);
Tank.Type = {};
Tank.Type.PLAYER_1 = 'player1';
Tank.Type.BASIC = 'basic';
Tank.Type.FAST = 'fast';
Tank.Event = {};
Tank.Event.SHOOT = 'Tank.Event.SHOOT';
Tank.Event.CREATED = 'Tank.Event.CREATED';
Tank.Event.DESTROYED = 'Tank.Event.DESTROYED';
Tank.prototype.getState = function () {
    return this._state;
};
Tank.prototype.setState = function (state) {
    this._state = state;
};
Tank.prototype.getType = function () {
    return this._type;
};
Tank.prototype.setType = function (type) {
    this._type = type;
};

Tank.prototype.isPlayer = function () {
    return this._player;
};

Tank.prototype.makeEnemy = function () {
    this._player = false;
};

Tank.prototype.setBulletSize = function (size) {
    this._bulletSize = size;
};

Tank.prototype.getBulletSize = function () {
    return this._bulletSize;
};

Tank.prototype.setBulletSpeed = function (speed) {
    this._bulletSpeed = speed;
};
Tank.prototype.getBulletSpeed = function () {
    return this._bulletSpeed;
};

Tank.prototype.shoot = function () {
    if (!this._state.canShoot()) {
        return;
    }
    if (this._bulletShot) {
        return;
    }
    this._bulletShot = true;
    this._eventManager.fireEvent({ 'name': Tank.Event.SHOOT, 'tank': this });
};
Tank.prototype.updateHook = function () {
    this._state.update();
};
Tank.prototype.notify = function (event) {
    if (event.name == Bullet.Event.DESTROYED && event.tank == this) {
        this._bulletShot = false;
    }
    else if (event.name == CollisionDetector.Event.COLLISION && event.initiator === this && event.sprite instanceof Wall) {
        this.resolveCollisionWithWall(event.sprite);
    }
    else if (event.name == CollisionDetector.Event.OUT_OF_BOUNDS && event.sprite === this) {
        this.resolveOutOfBounds(event.bounds);
    }
    else if (event.name == TankStateAppearing.Event.END && event.tank === this) {
        this.stateAppearingEnd();
    }
    else if (event.name == TankStateInvincible.Event.END && event.tank === this) {
        this._state = new TankStateNormal(this);
    }
};

Tank.prototype.stateAppearingEnd = function () {
    if (this._player) {
        this._state = new TankStateInvincible(this);
        this._direction = Sprite.Direction.UP;
    }
  else {
            this._state = new TankStateNormal(this);
            this._direction = Sprite.Direction.DOWN;
        }
    };

    Tank.prototype.setTurnSmoothSens = function (sensitivity) {
        this._turnSmoothSens = sensitivity;
    };
    Tank.prototype.getTurnSmoothSens = function () {
        return this._turnSmoothSens;
    };
    Tank.prototype.setTurnRoundTo = function (value) {
        this._turnRoundTo = value;
    };
    Tank.prototype.getTurnRoundTo = function () {
        return this._turnRoundTo;
    };
    Tank.prototype.move = function () {
        if (!this._state.canMove()) {
            return;
        }
        if (this._turn) {
            this._smoothTurn();
        }
        Sprite.prototype.move.call(this);
    };
    Tank.prototype.getEventManager = function () {
        return this._eventManager;
    };
    Tank.prototype.destroyHook = function () {
        this._eventManager.fireEvent({ 'name': Tank.Event.DESTROYED, 'tank': this });
    };
    Tank.prototype._smoothTurn = function () {
        var val;

        if (this._direction == Sprite.Direction.UP || this._direction == Sprite.Direction.DOWN) {
            if (this._prevDirection == Sprite.Direction.RIGHT) {
                val = this._turnRoundTo - (this._x % this._turnRoundTo);
                if (val < this._turnSmoothSens) {
                    this._x += val;
                }
            }
            else if (this._prevDirection == Sprite.Direction.LEFT) {
                val = this._x % this._turnRoundTo;
                if (val < this._turnSmoothSens) {
                    this._x -= val;
                }
            }
        }
        else {
            if (this._prevDirection == Sprite.Direction.DOWN) {
                val = this._turnRoundTo - (this._y % this._turnRoundTo);
                if (val < this._turnSmoothSens) {
                    this._y += val;
                }
            }
            else if (this._prevDirection == Sprite.Direction.UP) {
                val = this._y % this._turnRoundTo;
                if (val < this._turnSmoothSens) {
                    this._y -= val;
                }
            }
        }
    };
    Tank.prototype.draw = function (ctx) {
        this._state.draw(ctx);
    };
    Tank.prototype.resolveCollisionWithWall = function (wall) {
        var moveX = 0;
        var moveY = 0;
        if (this._direction == Sprite.Direction.RIGHT) {
            moveX = this.getRight() - wall.getLeft() + 1;
        }
        else if (this._direction == Sprite.Direction.LEFT) {
            moveX = this.getLeft() - wall.getRight() - 1;
        }
        else if (this._direction == Sprite.Direction.UP) {
            moveY = this.getTop() - wall.getBottom() - 1;
        }
        else if (this._direction == Sprite.Direction.DOWN) {
            moveY = this.getBottom() - wall.getTop() + 1;
        }
        this._x -= moveX;
        this._y -= moveY;
    };