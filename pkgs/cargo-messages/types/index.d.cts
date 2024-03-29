export type CrateType =
  | 'dylib'
  | 'cdylib'
  | 'rlib';

export interface CargoArtifact {
  findFileByCrateType(crateType: CrateType): string | null;
}

export type CargoMessageOptions = {
  mount?: string,
  manifestPath?: string,
  file?: string,
  verbose?: boolean,
};

export class CargoMessages {
  constructor(options?: CargoMessageOptions);
  findArtifact(crateName: string): CargoArtifact | null;
}

export type CargoReaderOptions = {
  mount?: string,
  manifestPath?: string,
  verbose?: boolean,
}

export interface CargoMessage {
  isCompilerArtifact(): this is CompilerArtifact;
  isCompilerMessage(): this is CompilerMessage;
  isBuildScriptExecuted(): this is BuildScriptExecuted;
  isBuildFinished(): this is BuildFinished;
  isTextLine(): this is TextLine;
}

export interface CompilerArtifact extends CargoMessage {
  crateName(): string;
  findFileByCrateType(crateType: CrateType): string | null;
}

export interface CompilerMessage extends CargoMessage { }

export interface BuildScriptExecuted extends CargoMessage { }

export interface BuildFinished extends CargoMessage { }

export interface TextLine extends CargoMessage { }

export class CargoReader implements AsyncIterable<CargoMessage> {
  constructor(input: NodeJS.ReadableStream, options?: CargoReaderOptions);
  [Symbol.asyncIterator](): AsyncIterator<CargoMessage>;
}
