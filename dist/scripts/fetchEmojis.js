"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var path_1 = tslib_1.__importDefault(require("path"));
var xml2js_1 = require("xml2js");
var app_root_path_1 = tslib_1.__importDefault(require("app-root-path"));
var rootDirectory = app_root_path_1.default.path;
var fetchEmojis = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var cldrDirectory, cldrEmojisDirectory, distEmojisDirectory, files, i, file, fileExtension, fileName, fullFilePath, xml, result, emojis, data, i_1, emoji, keywords, symbol, type;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cldrDirectory = path_1.default.resolve(path_1.default.join(rootDirectory, 'cldr'));
                cldrEmojisDirectory = path_1.default.resolve(path_1.default.join(cldrDirectory, 'common', 'annotations'));
                distEmojisDirectory = path_1.default.resolve(path_1.default.join(rootDirectory, 'dist', 'emojis'));
                return [4, fs_extra_1.default.ensureDir(distEmojisDirectory)];
            case 1:
                _a.sent();
                return [4, fs_extra_1.default.readdir(cldrEmojisDirectory)];
            case 2:
                files = _a.sent();
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < files.length)) return [3, 8];
                file = files[i];
                fileExtension = path_1.default.extname(file);
                fileName = path_1.default.basename(file, fileExtension);
                console.log('file', file);
                fullFilePath = path_1.default.resolve(path_1.default.join(cldrEmojisDirectory, file));
                return [4, fs_extra_1.default.readFile(fullFilePath, 'utf8')];
            case 4:
                xml = _a.sent();
                return [4, xml2js_1.parseStringPromise(xml)];
            case 5:
                result = _a.sent();
                if (!(result.ldml && result.ldml.annotations)) return [3, 7];
                emojis = result.ldml.annotations[0].annotation;
                data = { emojis: [] };
                for (i_1 = 0; i_1 < emojis.length; i_1++) {
                    emoji = emojis[i_1];
                    keywords = emoji._.split('|').map(function (e) { return e.trim(); });
                    symbol = emoji.$.cp;
                    type = emoji.$.type;
                    if (type !== 'tts') {
                        data.emojis.push({
                            symbol: symbol,
                            keywords: keywords
                        });
                    }
                }
                return [4, fs_extra_1.default.writeFileSync(path_1.default.join(distEmojisDirectory, fileName + ".json"), JSON.stringify(data), 'utf8')];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                i++;
                return [3, 3];
            case 8: return [2];
        }
    });
}); };
fetchEmojis().then(function () {
    console.log('done.');
});
//# sourceMappingURL=fetchEmojis.js.map