import commandLineArgs from 'command-line-args';
import { Command, CommandDetail, CommandSection } from '../command.js';
import { SourceManifest } from '../manifest.js';

const OPTIONS = [
  { name: 'verbose', alias: 'v', type: Boolean, defaultValue: false }
];

export default class ListPlatforms implements Command {
  static summary(): string { return 'Display the JSON target data for this project\'s platforms.'; }
  static syntax(): string { return 'neon list-platforms [-v]'; }
  static options(): CommandDetail[] {
    return [
      { name: '-v, --verbose', summary: 'Enable verbose logging. (Default: false)' }
    ];
  }
  static seeAlso(): CommandDetail[] | void { }
  static extraSection(): CommandSection | void { }
  
  private _verbose: boolean;
  
  constructor(argv: string[]) {
    const options = commandLineArgs(OPTIONS, { argv });
  
    this._verbose = !!options.verbose;
  }

  log(msg: string) {
    if (this._verbose) {
      console.error("[neon list-platforms] " + msg);
    }
  }
  
  async run() {
    this.log(`reading package.json`);
    const sourceManifest = await SourceManifest.load();
    this.log(`manifest: ${sourceManifest.stringify()}`);
    const platforms = sourceManifest.allPlatforms();
    console.log(JSON.stringify(platforms, null, 2));
  }
}
