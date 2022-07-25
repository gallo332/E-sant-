import { Injectable, InjectionToken, Inject } from '@angular/core';
import { providers } from 'ethers';
import * as IpfsHttpClient from 'ipfs-http-client';
// import { IPFSHTTPClient } from 'ipfs-http-client';

export const ipfsToken = new InjectionToken('The IPFS Token', {
  providedIn: 'root',
  factory: () => {
    let contextClass : any = IpfsHttpClient;
    let context: IpfsHttpClient.IPFSHTTPClient = new contextClass('localhost', '5001', {
        protocol: 'https'
      });

    try {
        console.log("IPFS");
        
      return context;
    } catch (err) {
      console.log('Error', err);
      throw new Error('Unable to access IPFS node daemon on Infura network');
    }
  }
});
