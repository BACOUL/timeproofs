/* sdk/verify.js
 * TimeProofs v0.2 – Offline verification helpers
 *
 * - verifyBundle(bundle, fileOrBytes?)
 *   → { valid, schemaValid, proofValid, hashMatches, userSignValid, errors }
 *
 * Remarques v0.2 :
 * - La vérification Ed25519 n'est pas encore implémentée.
 * - La vérification HMAC côté serveur n'est pas possible côté client (secret).
 * - Ce module vérifie :
 *   - la structure minimale du bundle,
 *   - la cohérence du hash si un fichier ou des bytes sont fournis.
 */

import { hashBytes, hashFile, hashText, isBrowser } from "./hash.js";
import { BUNDLE_VERSION } from "./bundle.js";

/**
 * Vérifie rapidement si une valeur ressemble à un SHA-256 hex.
 * @param {string} hex
 * @returns {boolean}
 */
function isValidSha256Hex(hex) {
  return typeof hex === "string" && /^[0-9a-fA-F]{64}$/.test(hex.trim());
}

/**
 * Validation structurelle minimale du bundle.
 * On ne remplace pas le JSON Schema officiel, on fait une passe rapide.
 *
 * @param {any} bundle
 * @param {string[]} errors
 * @returns {boolean} schemaValid
 */
function basicSchemaCheck(bundle, errors) {
  if (!bundle || typeof bundle !== "object") {
    errors.push("bundle-not-object");
    return false;
  }

  // version
  if (bundle.version !== BUNDLE_VERSION) {
    errors.push(`invalid-version: expected ${BUNDLE_VERSION}`);
  }

  // hash
  const h = bundle.hash;
  if (!h || typeof h !== "object") {
    errors.push("hash-missing");
  } else {
    if (h.algorithm !== "SHA-256") {
      errors.push('hash.algorithm-must-be-"SHA-256"');
    }
    if (!isValidSha256Hex(h.value || "")) {
      errors.push("hash.value-invalid-sha256");
    }
  }

  // timestamp
  const t = bundle.timestamp;
  if (!t || typeof t !== "object") {
    errors.push("timestamp-missing");
  } else {
    if (typeof t.issuedAt !== "string" || !t.issuedAt.length) {
      errors.push("timestamp.issuedAt-invalid");
    }
    if (typeof t.issuer !== "string" || !t.issuer.length) {
      errors.push("timestamp.issuer-invalid");
    }
  }

  // proof
  const p = bundle.proof;
  if (!p || typeof p !== "object") {
    errors.push("proof-missing");
  } else {
    if (typeof p.algo !== "string" || !p.algo.length) {
      errors.push("proof.algo-invalid");
    }
    if (typeof p.keyId !== "string" || !p.keyId.length) {
      errors.push("proof.keyId-invalid");
    }
  }

  return errors.length === 0;
}

/**
 * Recalcule le hash d'un support fourni et compare au bundle.hash.value.
 *
 * @param {object} bundle
 * @param {any} fileOrBytes
 * @param {string[]} errors
 * @returns {Promise<boolean|null>} hashMatches
 */
async function checkHashMatch(bundle, fileOrBytes, errors) {
  if (fileOrBytes == null) {
    return null; // pas de fichier fourni → pas de comparaison possible
  }

  const targetHex = (bundle.hash && bundle.hash.value
    ? String(bundle.hash.value)
    : ""
  ).toLowerCase().trim();

  if (!isValidSha256Hex(targetHex)) {
    errors.push("hash.value-invalid-sha256");
    return false;
  }

  let computedHex;

  // Uint8Array
  if (fileOrBytes instanceof Uint8Array) {
    computedHex = (await hashBytes(fileOrBytes)).toLowerCase();
  }
  // File/Blob (navigateur)
  else if (isBrowser && fileOrBytes instanceof Blob) {
    computedHex = (await hashFile(fileOrBytes)).toLowerCase();
  }
  // string → hashText (optionnel)
  else if (typeof fileOrBytes === "string") {
    computedHex = (await hashText(fileOrBytes)).toLowerCase();
  } else {
    errors.push("unsupported-fileOrBytes-type");
    return false;
  }

  if (computedHex !== targetHex) {
    errors.push("hash-mismatch");
    return false;
  }

  return true;
}

/**
 * Vérification de la signature serveur (Ed25519 + HMAC).
 * v0.2 : placeholder – pas de vérification cryptographique, uniquement marquage.
 *
 * @param {object} bundle
 * @param {string[]} errors
 * @returns {boolean} proofValid
 */
function checkServerProof(bundle, errors) {
  const proof = bundle.proof || {};
  const algo = proof.algo || "";

  // On accepte le schéma mais on signale que la vérification Ed25519 n'est pas encore faite.
  if (!algo) {
    errors.push("proof.algo-missing");
    return false;
  }

  // TODO v0.2+ : vérifier Ed25519 + keyId via JWKS
  errors.push("ed25519-verification-not-implemented-v0.2");

  // Pour l’instant, on considère proofValid = true structurellement,
  // mais on garde une alerte dans errors.
  return true;
}

/**
 * Vérification de la signature locale utilisateur (userSign).
 * v0.2 : placeholder – pas d’Ed25519 client, on marque seulement la présence.
 *
 * @param {object} bundle
 * @param {string[]} errors
 * @returns {boolean|null} userSignValid
 */
function checkUserSign(bundle, errors) {
  const us = bundle.userSign;
  if (!us) return null;

  // On vérifie seulement la présence des champs
  if (
    typeof us.publicKey !== "string" ||
    !us.publicKey.length ||
    typeof us.algorithm !== "string" ||
    !us.algorithm.length ||
    typeof us.signature !== "string" ||
    !us.signature.length
  ) {
    errors.push("userSign-structure-invalid");
    return false;
  }

  // TODO v0.2+ : vérifier la signature Ed25519 sur meta
  errors.push("userSign-verification-not-implemented-v0.2");
  return true;
}

/**
 * Vérifie un bundle .tproof.json hors-ligne.
 *
 * @param {object} bundle
 * @param {any} [fileOrBytes]  // optionnel : Uint8Array, Blob/File (browser), string
 * @returns {Promise<{
 *   valid: boolean,
 *   schemaValid: boolean,
 *   proofValid: boolean,
 *   hashMatches: boolean | null,
 *   userSignValid: boolean | null,
 *   errors: string[]
 * }>}
 */
export async function verifyBundle(bundle, fileOrBytes) {
  const errors = [];

  // 1) Schéma minimal
  const schemaValid = basicSchemaCheck(bundle, errors);

  // 2) Preuve serveur (sans crypto Ed25519 pour l’instant)
  const proofValid = schemaValid ? checkServerProof(bundle, errors) : false;

  // 3) Hash local si un fichier est fourni
  const hashMatches = schemaValid
    ? await checkHashMatch(bundle, fileOrBytes, errors)
    : null;

  // 4) userSign (si présent)
  const userSignValid = schemaValid ? checkUserSign(bundle, errors) : null;

  // 5) Agrégation
  const valid =
    schemaValid &&
    proofValid &&
    (hashMatches !== false) &&
    (userSignValid !== false);

  return {
    valid,
    schemaValid,
    proofValid,
    hashMatches,
    userSignValid,
    errors,
  };
  }
