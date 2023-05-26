import { isString } from 'class-validator';

export class ValidateHelper {
  public static sanitize(searchTerm: string): string {
    if (typeof searchTerm !== 'string') {
      return '';
    }

    const sanitized = searchTerm.match(/[\p{L}|\p{N}|\s]/gu);

    return sanitized ? sanitized.join('') : '';
  }

  public static sanitizePhoneNumber(phoneNumber: string): string {
    if (!isString(phoneNumber)) {
      return phoneNumber;
    }

    return phoneNumber.replace(/[^+\d]/g, '');
  }

  public static sanitizeUrlAlias(alias: string): string {
    if (!isString(alias)) {
      return '';
    }

    return alias.replace(/[^a-zA-Z0-9-]/g, '');
  }
}
