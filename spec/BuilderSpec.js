describe("Builder", function () {
    it("should subscribe", function () {
        var eventManager = new EventManager();
        spyOn(eventManager, 'addSubscriber');
        var builder = new Builder(eventManager);
        expect(eventManager.addSubscriber).toHaveBeenCalledWith(builder,
            [Cursor.Event.BUILD, Cursor.Event.MOVED]);
    });

    describe("#notify", function () {
        it("build", function () {
            var eventManager = new EventManager();
            var builder = new Builder(eventManager);
            spyOn(builder, 'build');
            var cursor = new Cursor(eventManager);
            builder.notify({ 'name': Cursor.Event.BUILD, 'cursor': cursor });
            expect(builder.build).toHaveBeenCalledWith(cursor);
        });
    });

    describe("#build", function () {
        var eventManager, builder, cursor;

        beforeEach(function () {
            eventManager = new EventManager();
            builder = new Builder(eventManager);
            cursor = new Cursor(eventManager);
        });

        it("should call appropriate build function", function () {
            spyOn(builder, 'buildBrickWallRight');
            spyOn(builder, 'buildBrickWallBottom');
            spyOn(builder, 'buildBrickWallLeft');
            spyOn(builder, 'buildBrickWallTop');
            spyOn(builder, 'buildBrickWallFull');

            spyOn(builder, 'buildSteelWallRight');
            spyOn(builder, 'buildSteelWallBottom');
            spyOn(builder, 'buildSteelWallLeft');
            spyOn(builder, 'buildSteelWallTop');
            spyOn(builder, 'buildSteelWallFull');

            builder.build(cursor);
            expect(builder.buildBrickWallRight).toHaveBeenCalledWith(cursor.getPosition());
            builder.buildBrickWallRight.reset();

            builder.build(cursor);
            expect(builder.buildBrickWallBottom).toHaveBeenCalledWith(cursor.getPosition());
            builder.buildBrickWallBottom.reset();

            builder.build(cursor);
            expect(builder.buildBrickWallLeft).toHaveBeenCalledWith(cursor.getPosition());
            builder.buildBrickWallLeft.reset();

            builder.build(cursor);
            expect(builder.buildBrickWallTop).toHaveBeenCalledWith(cursor.getPosition());
            builder.buildBrickWallTop.reset();

            builder.build(cursor);
            expect(builder.buildBrickWallFull).toHaveBeenCalledWith(cursor.getPosition());
            builder.buildBrickWallFull.reset();

            expect(builder.buildSteelWallRight).toHaveBeenCalledWith(cursor.getPosition());
            builder.buildSteelWallRight.reset();

            builder.build(cursor);
            expect(builder.buildSteelWallBottom).toHaveBeenCalledWith(cursor.getPosition());
            builder.buildSteelWallBottom.reset();

            builder.build(cursor);
            expect(builder.buildSteelWallLeft).toHaveBeenCalledWith(cursor.getPosition());
            builder.buildSteelWallLeft.reset();

            builder.build(cursor);
            expect(builder.buildSteelWallTop).toHaveBeenCalledWith(cursor.getPosition());
            builder.buildSteelWallTop.reset();

            builder.build(cursor);
            expect(builder.buildSteelWallFull).toHaveBeenCalledWith(cursor.getPosition());
            builder.buildSteelWallFull.reset();
        });

        it("if cursor has moved, build last structure on the new spot", function () {
            spyOn(builder, 'buildBrickWallRight');

            builder.build(cursor);
            expect(builder.buildBrickWallRight).toHaveBeenCalled();
            builder.buildBrickWallRight.reset();
            builder.notify({ 'name': Cursor.Event.MOVED, 'cursor': cursor });
            builder.build(cursor);
            expect(builder.buildBrickWallRight).toHaveBeenCalled();
        });

        it("should fire event", function () {
            spyOn(eventManager, 'fireEvent');
            builder.setStructure(Builder.Structure.BRICK_WALL_RIGHT);
            builder.build(cursor);
            expect(eventManager.fireEvent).toHaveBeenCalledWith({
                'name': Builder.Event.STRUCTURE_CREATED,
                'structure': builder.buildBrickWallRight(cursor.getPosition()),
                'cursor': cursor
            });
        });
    });

    describe("build functions", function () {
        var eventManager, builder;

        beforeEach(function () {
            eventManager = new EventManager();
            builder = new Builder(eventManager);
            builder.setTileSize(4);
        });

        it("#buildBrickWallRight", function () {
            var parts = builder.buildBrickWallRight(new Point(2, 3));
            expect(parts[0] instanceof BrickWall).toBeTruthy();
            expect(parts[0].getPosition()).toEqual(new Point(6, 3))
            expect(parts[1].getPosition()).toEqual(new Point(6, 7))
        });
        it("#buildBrickWallBottom", function () {
            var parts = builder.buildBrickWallBottom(new Point(2, 3));
            expect(parts[0] instanceof BrickWall).toBeTruthy();
            expect(parts[0].getPosition()).toEqual(new Point(2, 7))
            expect(parts[1].getPosition()).toEqual(new Point(6, 7))
        });
        it("#buildBrickWallLeft", function () {
            var parts = builder.buildBrickWallLeft(new Point(2, 3));
            expect(parts[0] instanceof BrickWall).toBeTruthy();
            expect(parts[0].getPosition()).toEqual(new Point(2, 3))
            expect(parts[1].getPosition()).toEqual(new Point(2, 7))
        });
        it("#buildBrickWallTop", function () {
            var parts = builder.buildBrickWallTop(new Point(2, 3));
            expect(parts[0] instanceof BrickWall).toBeTruthy();
            expect(parts[0].getPosition()).toEqual(new Point(2, 3))
            expect(parts[1].getPosition()).toEqual(new Point(6, 3))
        });
        it("#buildBrickWallFull", function () {
            var parts = builder.buildBrickWallFull(new Point(2, 3));
            expect(parts[0] instanceof BrickWall).toBeTruthy();
            expect(parts[0].getPosition()).toEqual(new Point(2, 3))
            expect(parts[1].getPosition()).toEqual(new Point(6, 3))
            expect(parts[2].getPosition()).toEqual(new Point(2, 7))
            expect(parts[3].getPosition()).toEqual(new Point(6, 7))
        });

        it("#buildSteelWallRight", function () {
            var parts = builder.buildSteelWallRight(new Point(2, 3));
            expect(parts[0] instanceof SteelWall).toBeTruthy();
            expect(parts[0].getPosition()).toEqual(new Point(6, 3))
            expect(parts[1].getPosition()).toEqual(new Point(6, 7))
        });

        it("#buildSteelWallRight", function () {
            var parts = builder.buildSteelWallBottom(new Point(2, 3));
            expect(parts[0] instanceof SteelWall).toBeTruthy();
            expect(parts[0].getPosition()).toEqual(new Point(2, 7))
            expect(parts[1].getPosition()).toEqual(new Point(6, 7))
        });

        it("#buildSteelWallLeft", function () {
            var parts = builder.buildSteelWallLeft(new Point(2, 3));
            expect(parts[0] instanceof SteelWall).toBeTruthy();
            expect(parts[0].getPosition()).toEqual(new Point(2, 3))
            expect(parts[1].getPosition()).toEqual(new Point(2, 7))
        });

        it("#buildSteelWallTop", function () {
            var parts = builder.buildSteelWallTop(new Point(2, 3));
            expect(parts[0] instanceof SteelWall).toBeTruthy();
            expect(parts[0].getPosition()).toEqual(new Point(2, 3))
            expect(parts[1].getPosition()).toEqual(new Point(6, 3))
        });

        it("#buildSteelWallFull", function () {
            var parts = builder.buildSteelWallFull(new Point(2, 3));
            expect(parts[0] instanceof SteelWall).toBeTruthy();
            expect(parts[0].getPosition()).toEqual(new Point(2, 3))
            expect(parts[1].getPosition()).toEqual(new Point(6, 3))
            expect(parts[2].getPosition()).toEqual(new Point(2, 7))
            expect(parts[3].getPosition()).toEqual(new Point(6, 7))
        });
    });
});