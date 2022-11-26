const infoController = (req, res) => {

    const info = {
        args: process.argv.slice(2),
        os: process.platform,
        nodeVersion: process.version,
        rss: process.memoryUsage().rss,
        execPath: process.execPath,
        processId: process.pid,
        directoryPath: process.cwd()
    }

    res.render("info", {info} );
};

export default infoController;