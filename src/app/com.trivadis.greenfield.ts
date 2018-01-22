import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.trivadis.greenfield{
   export enum IdeaState {
      FRESH,
      INWORK,
      FINISHED,
   }
   export class Idea extends Asset {
      ideaId: string;
      description: string;
      days: number;
      state: IdeaState;
      owner: Person;
      adapter: Person[];
      likedBy: Person[];
      followedBy: Person[];
   }
   export class PersonalWallet extends Asset {
      walletId: string;
      days: number;
      owner: Person;
   }
   export class Person extends Participant {
      personId: string;
      firstName: string;
      lastName: string;
   }
   export class IdeaDonateDays extends Transaction {
      wallet: PersonalWallet;
      idea: Idea;
      days: number;
      donationDate: Date;
   }
   export class IdeaLike extends Transaction {
      idea: Idea;
      person: Person;
   }
   export class IdeaFollow extends Transaction {
      idea: Idea;
      person: Person;
   }
   export class IdeaStateChange extends Transaction {
      idea: Idea;
      state: IdeaState;
   }
   export class PersonalWalletRevokeDays extends Transaction {
      days: number;
   }
   export class PersonalWalletReleaseDays extends Transaction {
      days: number;
   }
   export class ReceivedDonationEvent extends Event {
      idea: Idea;
      days: number;
   }
   export class DonationSuccessEvent extends Event {
      message: string;
      daysRemaining: number;
   }
   export class DonationFailedEvent extends Event {
      message: string;
      daysToDonate: number;
      daysAvailable: number;
   }
   export class ReleaseDaysEvent extends Event {
   }
   export class RevokeDaysEvent extends Event {
   }
   export class IdeaFollowedEvent extends Event {
      person: Person;
      count: number;
   }
   export class IdeaLikedEvent extends Event {
      person: Person;
      count: number;
   }
   export class IdeaStateChangeEvent extends Event {
      idea: Idea;
      oldState: IdeaState;
      newState: IdeaState;
   }
// }
